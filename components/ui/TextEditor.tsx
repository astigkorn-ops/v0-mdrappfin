"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { 
  Bold, 
  Italic, 
  Underline, 
  List, 
  ListOrdered, 
  Link, 
  Image, 
  Type,
  AlignLeft,
  AlignCenter,
  AlignRight
} from "lucide-react"

interface TextEditorProps {
  initialContent?: string
  onChange?: (content: string) => void
  placeholder?: string
  minHeight?: string
}

export default function TextEditor({ 
  initialContent = "", 
  onChange, 
  placeholder = "Start typing...",
  minHeight = "200px"
}: TextEditorProps) {
  const [content, setContent] = useState(initialContent)
  const [isPreview, setIsPreview] = useState(false)

  useEffect(() => {
    setContent(initialContent)
  }, [initialContent])

  const handleContentChange = (value: string) => {
    setContent(value)
    onChange?.(value)
  }

  const insertText = (before: string, after: string = "") => {
    const textarea = document.getElementById("editor-textarea") as HTMLTextAreaElement
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = content.substring(start, end)
    const newText = content.substring(0, start) + before + selectedText + after + content.substring(end)
    
    handleContentChange(newText)
    
    // Restore cursor position
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + before.length, end + before.length)
    }, 0)
  }

  const formatButtons = [
    { icon: Bold, action: () => insertText("**", "**"), title: "Bold" },
    { icon: Italic, action: () => insertText("*", "*"), title: "Italic" },
    { icon: Underline, action: () => insertText("<u>", "</u>"), title: "Underline" },
    { icon: List, action: () => insertText("\n- "), title: "Bullet List" },
    { icon: ListOrdered, action: () => insertText("\n1. "), title: "Numbered List" },
    { icon: Link, action: () => insertText("[", "](url)"), title: "Link" },
    { icon: Image, action: () => insertText("![alt text](", ")"), title: "Image" },
    { icon: Type, action: () => insertText("# "), title: "Heading" },
  ]

  const renderPreview = (text: string) => {
    // Simple markdown-like rendering
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/<u>(.*?)<\/u>/g, '<u>$1</u>')
      .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold mb-4">$1</h1>')
      .replace(/^## (.*$)/gm, '<h2 class="text-xl font-bold mb-3">$1</h2>')
      .replace(/^### (.*$)/gm, '<h3 class="text-lg font-bold mb-2">$1</h3>')
      .replace(/^\- (.*$)/gm, '<li class="ml-4">• $1</li>')
      .replace(/^\d+\. (.*$)/gm, '<li class="ml-4">$1</li>')
      .replace(/\n/g, '<br>')
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="border-b bg-gray-50 p-2 flex items-center justify-between">
        <div className="flex items-center gap-1">
          {formatButtons.map((button, index) => {
            const Icon = button.icon
            return (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                onClick={button.action}
                title={button.title}
                type="button"
              >
                <Icon className="h-4 w-4" />
              </Button>
            )
          })}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={isPreview ? "outline" : "ghost"}
            size="sm"
            onClick={() => setIsPreview(false)}
            type="button"
          >
            Edit
          </Button>
          <Button
            variant={isPreview ? "ghost" : "outline"}
            size="sm"
            onClick={() => setIsPreview(true)}
            type="button"
          >
            Preview
          </Button>
        </div>
      </div>

      {/* Editor/Preview Area */}
      <div className="p-4" style={{ minHeight }}>
        {isPreview ? (
          <div 
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: renderPreview(content) }}
          />
        ) : (
          <Textarea
            id="editor-textarea"
            value={content}
            onChange={(e) => handleContentChange(e.target.value)}
            placeholder={placeholder}
            className="w-full border-none resize-none focus:ring-0 focus:outline-none"
            style={{ minHeight: `calc(${minHeight} - 2rem)` }}
          />
        )}
      </div>

      {/* Footer */}
      <div className="border-t bg-gray-50 px-4 py-2 text-xs text-gray-500">
        {content.length} characters | Supports basic markdown formatting
      </div>
    </div>
  )
}
