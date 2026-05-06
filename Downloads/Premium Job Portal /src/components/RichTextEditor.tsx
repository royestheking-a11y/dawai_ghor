
import React, { useState, useEffect, useRef } from 'react';
import { Icons } from './Icons';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  height?: string;
}

export const RichTextEditor = ({ value, onChange, placeholder, className = '', height = 'h-64' }: RichTextEditorProps) => {
  // We use a simple textarea with markdown-like capabilities for robustness
  // in this environment, rather than a complex contentEditable which can be flaky without draft.js/tiptap
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const insertFormat = (startTag: string, endTag: string = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const before = text.substring(0, start);
    const selection = text.substring(start, end);
    const after = text.substring(end);

    const newText = `${before}${startTag}${selection}${endTag}${after}`;
    onChange(newText);
    
    // Restore selection and focus
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + startTag.length, end + startTag.length);
    }, 0);
  };

  const insertList = (prefix: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const text = textarea.value;
    const before = text.substring(0, start);
    // Find start of current line
    const lastNewLine = before.lastIndexOf('\n');
    const insertPos = lastNewLine === -1 ? 0 : lastNewLine + 1;
    
    const newText = text.substring(0, insertPos) + prefix + text.substring(insertPos);
    onChange(newText);
    
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + prefix.length);
    }, 0);
  };

  return (
    <div className={`border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden bg-white dark:bg-gray-800 focus-within:ring-2 focus-within:ring-emerald-500 focus-within:border-transparent transition-colors duration-200 ${className}`}>
      {/* Toolbar */}
      <div className="flex items-center gap-1 p-2 border-b border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 transition-colors">
        <button 
          type="button"
          onClick={() => insertFormat('**', '**')}
          className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 transition-colors"
          title="Bold"
        >
          <Icons.Bold className="w-4 h-4" />
        </button>
        <button 
          type="button"
          onClick={() => insertFormat('*', '*')}
          className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 transition-colors"
          title="Italic"
        >
          <Icons.Italic className="w-4 h-4" />
        </button>
        <div className="w-px h-4 bg-gray-300 dark:bg-gray-600 mx-1"></div>
        <button 
          type="button"
          onClick={() => insertList('- ')}
          className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 transition-colors"
          title="Bullet List"
        >
          <Icons.List className="w-4 h-4" />
        </button>
        <button 
          type="button"
          onClick={() => insertList('1. ')}
          className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 transition-colors"
          title="Numbered List"
        >
          <Icons.ListOrdered className="w-4 h-4" />
        </button>
      </div>

      {/* Text Area */}
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full p-4 resize-none outline-none text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 font-mono text-sm transition-colors ${height}`}
      />
      
      <div className="px-3 py-1 bg-gray-50 dark:bg-gray-700 text-xs text-gray-400 dark:text-gray-500 border-t border-gray-100 dark:border-gray-600 flex justify-between transition-colors">
        <span>Markdown supported</span>
        <span>{value.length} chars</span>
      </div>
    </div>
  );
};
