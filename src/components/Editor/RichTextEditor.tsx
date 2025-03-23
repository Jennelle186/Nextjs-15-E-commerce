import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextEditorMenuBar from "./TextEditorMenu";
import TextAlign from "@tiptap/extension-text-align";
import Heading from "@tiptap/extension-heading";
import Text from "@tiptap/extension-text";
import { mergeAttributes } from "@tiptap/core";

type TextEditorProps = {
  onChange: (content: string) => void;
  content?: string; // Add this line
};

export default function RichTextEditor({ onChange, content }: TextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Text,
      TextAlign.configure({
        types: ["paragraph"],
        alignments: ["left", "center", "right", "justify"],
      }),
      Heading.extend({
        levels: [1, 2, 3, 4, 5, 6],
        renderHTML({ node, HTMLAttributes }) {
          const level = this.options.levels.includes(node.attrs.level)
            ? node.attrs.level
            : this.options.levels[0];
          const classes: { [index: number]: string } = {
            1: "text-2xl",
            2: "text-xl",
            3: "text-lg",
            4: "text-md",
            5: "text-sm",
            6: "text-xs",
          };
          return [
            `h${level}`,
            mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
              class: `${classes[level]}`,
            }),
            0,
          ];
        },
      }).configure({ levels: [1, 2] }),
    ],
    content: content,
    onUpdate: ({ editor }) => {
      console.log(editor.getHTML());
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "w-full min-h-[150px] cursor-text rounded-md border p-5 ring-offset-background focus:outline-none focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
      },
    },

    immediatelyRender: false,
  });
  return (
    <div>
      <TextEditorMenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
