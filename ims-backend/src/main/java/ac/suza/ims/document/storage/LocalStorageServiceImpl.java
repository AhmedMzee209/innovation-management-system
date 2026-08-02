package ac.suza.ims.document.storage;

import ac.suza.ims.exception.BusinessException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.util.UUID;

@Slf4j
@Service
public class LocalStorageServiceImpl implements StorageService {

    private final Path baseStoragePath;

    public LocalStorageServiceImpl(@Value("${app.storage.local-directory:uploads/documents}") String baseDir) {
        this.baseStoragePath = Paths.get(baseDir).toAbsolutePath().normalize();
        try {
            Files.createDirectories(this.baseStoragePath);
        } catch (IOException e) {
            log.error("Could not create local storage base directory", e);
        }
    }

    @Override
    public String storeFile(byte[] bytes, String fileName, String subFolder) {
        try {
            Path targetDir = baseStoragePath;
            if (subFolder != null && !subFolder.trim().isEmpty()) {
                targetDir = baseStoragePath.resolve(subFolder);
                Files.createDirectories(targetDir);
            }
            String uniqueName = UUID.randomUUID().toString() + "_" + fileName;
            Path filePath = targetDir.resolve(uniqueName);
            Files.write(filePath, bytes, StandardOpenOption.CREATE, StandardOpenOption.TRUNCATE_EXISTING);
            return baseStoragePath.relativize(filePath).toString();
        } catch (IOException e) {
            log.error("Failed to store file {}", fileName, e);
            throw new BusinessException("Failed to store file locally: " + e.getMessage());
        }
    }

    @Override
    public byte[] loadFile(String storagePath) {
        try {
            Path filePath = baseStoragePath.resolve(storagePath).normalize();
            if (!Files.exists(filePath)) {
                throw new BusinessException("File not found on storage at path: " + storagePath);
            }
            return Files.readAllBytes(filePath);
        } catch (IOException e) {
            log.error("Failed to read file at path {}", storagePath, e);
            throw new BusinessException("Failed to read file from storage: " + e.getMessage());
        }
    }

    @Override
    public boolean deleteFile(String storagePath) {
        try {
            Path filePath = baseStoragePath.resolve(storagePath).normalize();
            return Files.deleteIfExists(filePath);
        } catch (IOException e) {
            log.error("Failed to delete file at path {}", storagePath, e);
            return false;
        }
    }
}
