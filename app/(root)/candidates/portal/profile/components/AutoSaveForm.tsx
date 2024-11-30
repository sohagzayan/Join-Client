'use client';

import debounce from 'lodash.debounce';
import { useCallback, useEffect, useRef } from 'react';
import { useFormStatus } from 'react-dom';
import { toast } from 'sonner';

interface AutoSaveFormProps {
  onSubmit: (data: FormData) => Promise<{ success: boolean; error?: string }>;
  children: React.ReactNode;
}

export function AutoSaveForm({ onSubmit, children }: AutoSaveFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const { pending } = useFormStatus();

  const debouncedSubmit = useCallback(
    debounce(async (formData: FormData) => {
      const result = await onSubmit(formData);
      if (result.success) {
        toast.success('Changes saved');
      } else {
        toast.error(result.error || 'Failed to save changes');
      }
    }, 1000),
    [],
  );

  useEffect(() => {
    const form = formRef.current;
    if (!form) return;

    const handleChange = (e: Event) => {
      const formData = new FormData(form);
      debouncedSubmit(formData);
    };

    form.addEventListener('change', handleChange);
    return () => form.removeEventListener('change', handleChange);
  }, [debouncedSubmit]);

  return (
    <form ref={formRef} className="space-y-8">
      {children}
      {pending && (
        <div className="fixed bottom-4 right-4">
          <div className="bg-primary text-primary-foreground animate-pulse rounded-md px-4 py-2">
            Saving...
          </div>
        </div>
      )}
    </form>
  );
}
