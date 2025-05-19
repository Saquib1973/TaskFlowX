import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

const Input: React.FC<InputProps> = ({ label, error, className = '', ...props }) => {
  return (
    <div className="space-y-2">
      <label htmlFor={props.id} className="block text-sm font-medium text-textSecondary font-simple">
        {label}
      </label>
      <input
        {...props}
        className={`block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-textPrimary placeholder:text-textSecondary outline-none transition-colors font-simple ${className}`}
      />
      {error && (
        <p className="text-sm text-red-500 font-simple">{error}</p>
      )}
    </div>
  )
}

export default Input