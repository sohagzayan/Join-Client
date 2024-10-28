import { Editor } from '@tinymce/tinymce-react';
import React from 'react';

interface RichTextEditorProps {
  apiKey: string;
  onChange: (content: string) => void;
}

interface RespondWith {
  string: (callback: () => Promise<string | void>) => void;
}

const editorConfig = {
  plugins: ['anchor', 'emoticons', 'link'],
  toolbar:
    'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons | removeformat',
  ai_request: (respondWith: RespondWith) => {
    respondWith.string(() =>
      Promise.reject('See docs to implement AI Assistant'),
    );
  },
  content_style: `
    body {
      background-color: #2A2E51;   /* Editor content area background */
      color: #D1D5DB;              /* Text color in editor content */
    }
    a {
      color: #D1D5DB;              /* Link color in editor content */
    }
  `,
  skin: 'oxide-dark',
  content_css: false,
  branding: false,
  statusbar: false,
};

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  apiKey,
  onChange,
}) => {
  return (
    <div>
      <Editor
        apiKey={apiKey}
        init={{
          ...editorConfig,
          height: 400,
          menubar: false,
        }}
        initialValue=""
        onEditorChange={onChange} // Trigger on content change
      />
    </div>
  );
};

export default RichTextEditor;
