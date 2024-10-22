import { cn } from '@/utils/config';

interface TextAreaWithIconProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  icon?: React.ElementType | null;
  className?: string;
  textAreaClassName?: string;
  label?: string;
  showLabel?: boolean;
  labelClassName?: string;
  [x: string]: any; // To allow any other textarea attributes
}

const TextArea: React.FC<TextAreaWithIconProps> = ({
  value = '',
  onChange,
  placeholder = 'Enter your bio',
  icon: Icon = null, // Default is null (no icon)
  className = '',
  textAreaClassName = '',
  label = 'Your Label',
  showLabel = false,
  labelClassName = '',
  ...rest
}) => {
  return (
    <div className={cn('w-full')}>
      {showLabel && (
        <label
          className={cn('mb-2 block font-semibold text-white', labelClassName)}
        >
          {label}
        </label>
      )}
      <div
        className={cn(
          'relative w-full rounded-2xl border border-transparent bg-[rgba(255,255,255,0.06)] p-2', // Default border is transparent
          className,
          'focus-within:border-theme1', // Add border color on focus using your theme color
        )}
      >
        <textarea
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={cn(
            'h-32 w-full resize-none bg-transparent p-3 text-gray-400 focus:border-theme1 focus:outline-none md:h-24 lg:h-40', // Change border on focus
            textAreaClassName,
          )}
          {...rest}
        />

        {Icon && (
          <div className="absolute bottom-3 right-3">
            <Icon className="h-6 w-6 text-white" />
          </div>
        )}
      </div>
    </div>
  );
};

export default TextArea;
