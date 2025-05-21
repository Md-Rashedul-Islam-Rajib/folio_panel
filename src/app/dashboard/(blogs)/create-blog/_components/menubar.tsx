import { Editor } from "@tiptap/react";
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaListUl,
  FaListOl,
  FaLink,
  FaParagraph,
  FaHeading,
  FaCode,
  FaQuoteRight,
  FaUndo,
  FaRedo,
  FaStrikethrough,
  FaImage,
} from "react-icons/fa";
import { RxDividerHorizontal } from "react-icons/rx";

export default function MenuBar({ editor }: { editor: Editor | null }) {
  if (!editor) return null;

  return (
    <div className="flex flex-wrap gap-1 p-2 border-b bg-gray-50">
      {/* Text Formatting */}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`p-2 rounded hover:bg-gray-100 ${
          editor.isActive("bold") ? "bg-gray-200" : ""
        }`}
        aria-label="Bold"
      >
        <FaBold className="w-4 h-4" />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`p-2 rounded hover:bg-gray-100 ${
          editor.isActive("italic") ? "bg-gray-200" : ""
        }`}
        aria-label="Italic"
      >
        <FaItalic className="w-4 h-4" />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={`p-2 rounded hover:bg-gray-100 ${
          editor.isActive("underline") ? "bg-gray-200" : ""
        }`}
        aria-label="Underline"
      >
        <FaUnderline className="w-4 h-4" />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={`p-2 rounded hover:bg-gray-100 ${
          editor.isActive("strike") ? "bg-gray-200" : ""
        }`}
        aria-label="Strikethrough"
      >
        <FaStrikethrough className="w-4 h-4" />
      </button>

      {/* Lists */}
      <div className="h-6 w-px bg-gray-300 mx-1" />
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-2 rounded hover:bg-gray-100 ${
          editor.isActive("bulletList") ? "bg-gray-200" : ""
        }`}
        aria-label="Bullet List"
      >
        <FaListUl className="w-4 h-4" />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-2 rounded hover:bg-gray-100 ${
          editor.isActive("orderedList") ? "bg-gray-200" : ""
        }`}
        aria-label="Numbered List"
      >
        <FaListOl className="w-4 h-4" />
      </button>

      {/* Headings */}
      <div className="h-6 w-px bg-gray-300 mx-1" />
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`p-2 rounded hover:bg-gray-100 ${
          editor.isActive("heading") ? "bg-gray-200" : ""
        }`}
        aria-label="Heading"
      >
        <FaHeading className="w-4 h-4" />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={`p-2 rounded hover:bg-gray-100 ${
          editor.isActive("paragraph") ? "bg-gray-200" : ""
        }`}
        aria-label="Paragraph"
      >
        <FaParagraph className="w-4 h-4" />
      </button>

      {/* Links & Media */}
      <div className="h-6 w-px bg-gray-300 mx-1" />
      <button
        type="button"
        onClick={() => {
          const previousUrl = editor.getAttributes("link").href;
          const url = window.prompt("URL", previousUrl);
          if (url === null) return;
          if (url === "") {
            editor.chain().focus().extendMarkRange("link").unsetLink().run();
            return;
          }
          editor
            .chain()
            .focus()
            .extendMarkRange("link")
            .setLink({ href: url })
            .run();
        }}
        className={`p-2 rounded hover:bg-gray-100 ${
          editor.isActive("link") ? "bg-gray-200" : ""
        }`}
        aria-label="Link"
      >
        <FaLink className="w-4 h-4" />
      </button>

      <button
        type="button"
        onClick={() => {
          const url = window.prompt("Enter image URL");
          if (url) editor.chain().focus().setImage({ src: url }).run();
        }}
        className="p-2 rounded hover:bg-gray-100"
        aria-label="Insert Image"
      >
        <FaImage className="w-4 h-4" />
      </button>

      {/* Code & Blockquote */}
      <div className="h-6 w-px bg-gray-300 mx-1" />
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleCode().run()}
        className={`p-2 rounded hover:bg-gray-100 ${
          editor.isActive("code") ? "bg-gray-200" : ""
        }`}
        aria-label="Code"
      >
        <FaCode className="w-4 h-4" />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`p-2 rounded hover:bg-gray-100 ${
          editor.isActive("blockquote") ? "bg-gray-200" : ""
        }`}
        aria-label="Blockquote"
      >
        <FaQuoteRight className="w-4 h-4" />
      </button>

      {/* Horizontal Rule */}
      <button
        type="button"
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        className="p-2 rounded hover:bg-gray-100"
        aria-label="Horizontal Rule"
      >
        <RxDividerHorizontal className="w-4 h-4" />
      </button>

      {/* Undo/Redo */}
      <div className="h-6 w-px bg-gray-300 mx-1" />
      <button
        type="button"
        onClick={() => editor.chain().focus().undo().run()}
        className="p-2 rounded hover:bg-gray-100"
        aria-label="Undo"
      >
        <FaUndo className="w-4 h-4" />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().redo().run()}
        className="p-2 rounded hover:bg-gray-100"
        aria-label="Redo"
      >
        <FaRedo className="w-4 h-4" />
      </button>
    </div>
  );
}
