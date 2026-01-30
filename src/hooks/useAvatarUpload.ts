import { useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { useAppDispatch } from '../app/hooks';
import { uploadAvatar } from '../features/auth/authSlice';

export const useAvatarUpload = (user: any) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!file || !user?._id) return;

    const formData = new FormData();
    formData.append('image', file);
    formData.append('id', user._id);

    dispatch(uploadAvatar(formData));
  };

  return {
    file,
    preview,
    fileInputRef,
    handleFileChange,
    handleButtonClick,
    handleSubmit,
  };
};
