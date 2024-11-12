import MiniLoadingCircle from '@/components/shared/mini-loading-circle/MiniLoadingCircle';
import React from 'react';

export default function Loading() {
  return (
    <div className="data-open:animate-overlay-show data-closed:animate-overlay-hide fixed inset-0 z-50 flex flex-col place-items-center items-center justify-center overflow-y-auto bg-white backdrop-blur-sm">
      <MiniLoadingCircle />
      <div className="mt-2">loading...</div>
    </div>
  );
}
