-- Move STUDENT and ALUMNI to INNOVATOR safely
INSERT INTO user_roles (user_id, role_id)
SELECT user_id, '085c804d-374f-4916-bf98-80049b755c3a' FROM user_roles WHERE role_id IN ('83dfdd3d-4d45-4b26-9281-e14aa14ee21e', '7ec19d4f-b3f4-479a-9a1c-2fb0f0caf7a0')
ON CONFLICT DO NOTHING;

DELETE FROM user_roles WHERE role_id IN ('83dfdd3d-4d45-4b26-9281-e14aa14ee21e', '7ec19d4f-b3f4-479a-9a1c-2fb0f0caf7a0');
DELETE FROM role_permissions WHERE role_id IN ('83dfdd3d-4d45-4b26-9281-e14aa14ee21e', '7ec19d4f-b3f4-479a-9a1c-2fb0f0caf7a0');
DELETE FROM roles WHERE id IN ('83dfdd3d-4d45-4b26-9281-e14aa14ee21e', '7ec19d4f-b3f4-479a-9a1c-2fb0f0caf7a0');
