import { Editor } from "@tiptap/react";

import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Italic,
  List,
  ListOrdered,
  Redo,
  Slash,
  Strikethrough,
  Underline,
  Undo,
} from "lucide-react";

const Button = ({
  onClick,
  isActive,
  disabled,
  children,
}: {
  onClick: () => void;
  isActive: boolean;
  disabled?: boolean;
  children: React.ReactNode;
}) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    className={`px-3 py-1 rounded-md transition-colors ${
      isActive
        ? "bg-purple-600 text-white"
        : "bg-gray-100 hover:bg-gray-200 text-gray-700"
    } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
  >
    {children}
  </button>
);

export default function TextEditorMenuBar({
  editor,
}: {
  editor: Editor | null;
}) {
  if (!editor) return null;

  const buttons = [
    {
      icon: <Bold className="size-5" />,
      onClick: () => editor.chain().focus().toggleBold().run(),
      isActive: editor.isActive("bold"),
    },
    {
      icon: <Underline className="size-5" />,
      onClick: () => editor.chain().focus().toggleUnderline().run(),
      isActive: editor.isActive("underline"),
    },
    {
      icon: <Italic className="size-5" />,
      onClick: () => editor.chain().focus().toggleItalic().run(),
      isActive: editor.isActive("italic"),
      disabled: !editor.can().chain().focus().toggleItalic().run(),
    },
    {
      icon: <Strikethrough className="size-5" />,
      onClick: () => editor.chain().focus().toggleStrike().run(),
      isActive: editor.isActive("strike"),
      disabled: !editor.can().chain().focus().toggleStrike().run(),
    },
    {
      icon: <Slash className="size-5" />,
      onClick: () => editor.chain().focus().toggleCode().run(),
      isActive: editor.isActive("code"),
      disabled: !editor.can().chain().focus().toggleCode().run(),
    },
    {
      icon: <List className="size-5" />,
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      isActive: editor.isActive("bulletList"),
    },
    {
      icon: <ListOrdered className="size-5" />,
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: editor.isActive("orderedList"),
      disabled: !editor.can().chain().focus().toggleOrderedList().run(),
    },
    {
      icon: <AlignLeft className="size-5" />,
      onClick: () => editor.chain().focus().setTextAlign("left").run(),
      isActive: editor.isActive({ textAlign: "left" }),
    },
    {
      icon: <AlignCenter className="size-5" />,
      onClick: () => editor.chain().focus().setTextAlign("center").run(),
      isActive: editor.isActive({ textAlign: "center" }),
    },
    {
      icon: <AlignRight className="size-5" />,
      onClick: () => editor.chain().focus().setTextAlign("right").run(),
      isActive: editor.isActive({ textAlign: "right" }),
    },
    {
      icon: <AlignJustify className="size-5" />,
      onClick: () => editor.chain().focus().setTextAlign("justify").run(),
      isActive: editor.isActive({ textAlign: "justify" }),
    },
    {
      icon: <Heading1 className="size-5" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: editor.isActive("heading", { level: 1 }),
    },
    {
      icon: <Heading2 className="size-5" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: editor.isActive("heading", { level: 2 }),
    },
    {
      icon: <Heading3 className="size-5" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      isActive: editor.isActive("heading", { level: 3 }),
    },
    {
      icon: <Heading4 className="size-5" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 4 }).run(),
      isActive: editor.isActive("heading", { level: 4 }),
    },
    {
      icon: <Heading5 className="size-5" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 5 }).run(),
      isActive: editor.isActive("heading", { level: 5 }),
    },
    {
      icon: <Heading6 className="size-5" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 6 }).run(),
      isActive: editor.isActive("heading", { level: 6 }),
    },
    {
      icon: <Undo className="size-5" />,
      onClick: () => editor.chain().focus().undo().run(),
      isActive: editor.isActive("undo"),
      disabled: !editor.can().chain().focus().undo().run(),
    },
    {
      icon: <Redo className="size-5" />,
      onClick: () => editor.chain().focus().redo().run(),
      isActive: editor.isActive("redo"),
      disabled: !editor.can().chain().focus().redo().run(),
    },
  ];

  return (
    <div className="mb-2 flex flex-wrap gap-2 border-b border-gray-300 pb-2">
      {buttons.map(({ icon, onClick, isActive, disabled }, index) => (
        <Button
          key={index}
          onClick={onClick}
          isActive={isActive}
          disabled={disabled}
        >
          {icon}
        </Button>
      ))}
    </div>
  );
}
