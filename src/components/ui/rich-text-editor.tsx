'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import { useState } from 'react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import { 
  Bold, Italic, Underline as UnderlineIcon, 
  Heading1, Heading2, Heading3, Heading4, Heading5, Heading6,
  List, ListOrdered, Quote, 
  Link as LinkIcon, Undo, Redo, Table as TableIcon,
  Code, Type
} from 'lucide-react'
import { Table } from '@tiptap/extension-table'
import { TableRow } from '@tiptap/extension-table-row'
import { TableCell } from '@tiptap/extension-table-cell'
import { TableHeader } from '@tiptap/extension-table-header'

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
}

export function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const [mode, setMode] = useState<'visual' | 'html'>('visual')

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
        },
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-amber-600 underline',
        }
      }),
      Table.configure({
        resizable: true,
        HTMLAttributes: {
          class: 'min-w-full divide-y divide-slate-300 border border-slate-300',
        },
      }),
      TableRow,
      TableHeader.configure({
        HTMLAttributes: {
          class: 'bg-slate-100 font-bold border border-slate-300 px-3 py-2',
        },
      }),
      TableCell.configure({
        HTMLAttributes: {
          class: 'border border-slate-300 px-3 py-2',
        },
      })
    ],
    content: value,
    onUpdate: ({ editor }) => {
      // When in visual mode, Tiptap is the source of truth.
      if (mode === 'visual') {
        onChange(editor.getHTML())
      }
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[300px] p-4',
      },
    },
  })

  const handleModeChange = (newMode: 'visual' | 'html') => {
    if (newMode === 'visual' && editor) {
      // When switching back to visual, force Tiptap to parse the raw HTML.
      editor.commands.setContent(value)
    }
    setMode(newMode)
  }

  if (!editor) {
    return null
  }

  const setLink = () => {
    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('URL', previousUrl)

    if (url === null) {
      return
    }

    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }

  return (
    <div className="border border-slate-200 rounded-lg overflow-hidden bg-white flex flex-col">
      {/* Mode Toggle Bar */}
      <div className="flex border-b border-slate-200 bg-slate-50">
        <button
          type="button"
          onClick={() => handleModeChange('visual')}
          className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
            mode === 'visual' 
              ? 'bg-white border-b-2 border-amber-500 text-amber-700' 
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <Type size={16} />
          Visual Editor
        </button>
        <button
          type="button"
          onClick={() => handleModeChange('html')}
          className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
            mode === 'html' 
              ? 'bg-slate-900 border-b-2 border-amber-500 text-white' 
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <Code size={16} />
          HTML Code
        </button>
      </div>

      {mode === 'visual' ? (
        <>
          {/* Tiptap Toolbar */}
          <div className="flex flex-wrap items-center gap-1 p-2 border-b border-slate-200 bg-white">
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleBold().run()}
              disabled={!editor.can().chain().focus().toggleBold().run()}
              className={`p-2 rounded hover:bg-slate-200 transition-colors ${editor.isActive('bold') ? 'bg-slate-200 text-slate-900' : 'text-slate-600'}`}
              title="Bold"
            >
              <Bold size={16} />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              disabled={!editor.can().chain().focus().toggleItalic().run()}
              className={`p-2 rounded hover:bg-slate-200 transition-colors ${editor.isActive('italic') ? 'bg-slate-200 text-slate-900' : 'text-slate-600'}`}
              title="Italic"
            >
              <Italic size={16} />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              disabled={!editor.can().chain().focus().toggleUnderline().run()}
              className={`p-2 rounded hover:bg-slate-200 transition-colors ${editor.isActive('underline') ? 'bg-slate-200 text-slate-900' : 'text-slate-600'}`}
              title="Underline"
            >
              <UnderlineIcon size={16} />
            </button>

            <div className="w-px h-6 bg-slate-300 mx-1" />

            <button
              type="button"
              onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
              className={`p-2 rounded hover:bg-slate-200 transition-colors ${editor.isActive('heading', { level: 1 }) ? 'bg-slate-200 text-slate-900' : 'text-slate-600'}`}
              title="Heading 1"
            >
              <Heading1 size={16} />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              className={`p-2 rounded hover:bg-slate-200 transition-colors ${editor.isActive('heading', { level: 2 }) ? 'bg-slate-200 text-slate-900' : 'text-slate-600'}`}
              title="Heading 2"
            >
              <Heading2 size={16} />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
              className={`p-2 rounded hover:bg-slate-200 transition-colors ${editor.isActive('heading', { level: 3 }) ? 'bg-slate-200 text-slate-900' : 'text-slate-600'}`}
              title="Heading 3"
            >
              <Heading3 size={16} />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
              className={`p-2 rounded hover:bg-slate-200 transition-colors ${editor.isActive('heading', { level: 4 }) ? 'bg-slate-200 text-slate-900' : 'text-slate-600'}`}
              title="Heading 4"
            >
              <Heading4 size={16} />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
              className={`p-2 rounded hover:bg-slate-200 transition-colors ${editor.isActive('heading', { level: 5 }) ? 'bg-slate-200 text-slate-900' : 'text-slate-600'}`}
              title="Heading 5"
            >
              <Heading5 size={16} />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
              className={`p-2 rounded hover:bg-slate-200 transition-colors ${editor.isActive('heading', { level: 6 }) ? 'bg-slate-200 text-slate-900' : 'text-slate-600'}`}
              title="Heading 6"
            >
              <Heading6 size={16} />
            </button>

            <div className="w-px h-6 bg-slate-300 mx-1" />

            <button
              type="button"
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={`p-2 rounded hover:bg-slate-200 transition-colors ${editor.isActive('bulletList') ? 'bg-slate-200 text-slate-900' : 'text-slate-600'}`}
              title="Bullet List"
            >
              <List size={16} />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={`p-2 rounded hover:bg-slate-200 transition-colors ${editor.isActive('orderedList') ? 'bg-slate-200 text-slate-900' : 'text-slate-600'}`}
              title="Ordered List"
            >
              <ListOrdered size={16} />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              className={`p-2 rounded hover:bg-slate-200 transition-colors ${editor.isActive('blockquote') ? 'bg-slate-200 text-slate-900' : 'text-slate-600'}`}
              title="Blockquote"
            >
              <Quote size={16} />
            </button>

            <div className="w-px h-6 bg-slate-300 mx-1" />

            <button
              type="button"
              onClick={setLink}
              className={`p-2 rounded hover:bg-slate-200 transition-colors ${editor.isActive('link') ? 'bg-slate-200 text-slate-900' : 'text-slate-600'}`}
              title="Add Link"
            >
              <LinkIcon size={16} />
            </button>

            <div className="w-px h-6 bg-slate-300 mx-1" />

            <button
              type="button"
              onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
              className="p-2 rounded hover:bg-slate-200 transition-colors text-slate-600"
              title="Insert Table"
            >
              <TableIcon size={16} />
            </button>

            <div className="w-px h-6 bg-slate-300 mx-1 flex-1 min-w-[1px]" />

            <button
              type="button"
              onClick={() => editor.chain().focus().undo().run()}
              disabled={!editor.can().chain().focus().undo().run()}
              className="p-2 rounded hover:bg-slate-200 transition-colors text-slate-600 disabled:opacity-50"
              title="Undo"
            >
              <Undo size={16} />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().redo().run()}
              disabled={!editor.can().chain().focus().redo().run()}
              className="p-2 rounded hover:bg-slate-200 transition-colors text-slate-600 disabled:opacity-50"
              title="Redo"
            >
              <Redo size={16} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto max-h-[600px] cursor-text" onClick={() => editor.commands.focus()}>
            <EditorContent editor={editor} />
          </div>
        </>
      ) : (
        <div className="flex-1 bg-slate-900">
          <div className="bg-slate-800 text-slate-400 text-xs px-4 py-2 flex justify-between items-center">
            <span>Raw HTML Editor</span>
            <span>All valid tags preserved</span>
          </div>
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full h-full min-h-[400px] max-h-[600px] p-4 font-mono text-sm text-slate-100 bg-transparent border-none focus:outline-none focus:ring-0 resize-y whitespace-pre-wrap overflow-x-auto"
            spellCheck={false}
            placeholder="<h1>Enter HTML here...</h1>"
          />
        </div>
      )}
    </div>
  )
}
