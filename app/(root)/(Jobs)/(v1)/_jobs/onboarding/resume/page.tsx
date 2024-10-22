'use client';
import MiniLoadingCircle from '@/components/shared/mini-loading-circle/MiniLoadingCircle';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

const Resume = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const upload_resume = async (event: any) => {
    if (event) {
      const [fileData] = event.target.files;
      console.log('event.target.files', event.target.files);

      // File type validation
      const allowedFileTypes = ['application/pdf']; // Only allow PDF files
      if (!allowedFileTypes.includes(fileData.type)) {
        toast.error('Invalid file type. Please upload a PDF file.');
        // console.log('Invalid file type. Please upload a PDF file.');
        // You can show an error message to the user or handle it in your application's UI
        return;
      }

      // File size validation (in bytes)
      const maxSizeInBytes = 5 * 1024 * 1024; // 5 MB
      if (fileData.size > maxSizeInBytes) {
        // console.log('File size exceeds the maximum allowed size.');
        toast.error('File size exceeds the maximum allowed size.');

        // You can show an error message to the user or handle it in your application's UI
        return;
      }

      const formData = new FormData();
      formData.append('file', fileData);
      formData.append('upload_preset', 'apper_upload'); // Replace 'your_upload_preset' with your Cloudinary upload preset

      try {
        const res = await axios.post(
          'https://api.cloudinary.com/v1_1/da0dxyn2l/auto/upload',
          formData,
        );
        console.log('file upload response:', res);

        // Handle the response according to your needs
        if (res.data && res.data.url) {
          // Handle PDF upload
          // console.log('PDF uploaded successfully:', res.data.url);
          return {
            resume: res.data.url,
            success: true,
          };
        } else {
          // console.log('Unexpected response:', res);
          toast.error('Unexpected Error upload resume!');

          return {
            error: 'Unexpected Error upload resume ',
            success: false,
          };
        }
      } catch (error) {
        // console.log("File upload error:", error);
        toast.error('Resume upload error');
        return {
          error: 'Resume upload error',
          success: false,
        };
      }
    }
  };

  const handleUploadResumeFunc = async (resumeEvent: any) => {
    setLoading(true);
    const resume = await upload_resume(resumeEvent);
    if (!resume?.success) {
      setLoading(false);
      // toast.error("something worked wrong!")
      return;
    }
    setLoading(false);
    toast.success('Upload successfully completed');
    await axios.post('/api/onboarding/resume', { resume: resume?.resume });
    console.log('resume url >>>>', resume);
  };

  return (
    <div className="container h-screen lg:px-16 xl:px-20">
      <div>
        <div className="mt-12 flex w-full items-center justify-center">
          <label
            htmlFor="dropzone-file"
            className="dark:hover:bg-bray-800 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            {loading && (
              <div>
                <MiniLoadingCircle />
              </div>
            )}

            {!loading && (
              <div>
                <div className="flex flex-col items-center justify-center pb-6 pt-5">
                  <svg
                    className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  onChange={(e) => handleUploadResumeFunc(e)}
                />
              </div>
            )}
          </label>
        </div>

        <div className="text-center">
          <Button
            onClick={() => router.push('/')}
            variant="outline"
            className="mt-5"
          >
            Skip for now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Resume;
