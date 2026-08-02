package ac.suza.ims.document.storage;

public interface StorageService {

    String storeFile(byte[] bytes, String fileName, String subFolder);

    byte[] loadFile(String storagePath);

    boolean deleteFile(String storagePath);
}
