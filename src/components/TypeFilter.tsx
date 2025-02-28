import { useMemo, useRef, useState } from 'react'
import { useClickOutside } from '../hooks/useClickOutside'
import { mediaTypes } from '../constants/movie'
import { MediaTypes } from '../types/search'

type TypeFilterProps = {
  selectedType: MediaTypes
  onChange: (type: MediaTypes) => void
}

export const TypeFilter: React.FC<TypeFilterProps> = ({ selectedType, onChange }) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useClickOutside(dropdownRef, () => {
    setIsOpen(false)
  })

  const selectedLabel = useMemo(
    () => mediaTypes.find(t => t.value === selectedType)?.label,
    [selectedType]
  )

  return (
    <div className='relative w-full sm:w-36' ref={dropdownRef}>
      <button
        type='button'
        onClick={() => setIsOpen(!isOpen)}
        className='w-full pl-4 pr-10 py-3 rounded-lg bg-gray-800 border border-gray-700 
        text-white text-left cursor-pointer hover:border-gray-600 
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
        transition-colors'>
        {selectedLabel}
        <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
          <svg
            className={`fill-current h-4 w-4 transition-transform ${
              isOpen ? 'transform rotate-180' : ''
            }`}
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 20 20'>
            <path d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' />
          </svg>
        </div>
      </button>

      {isOpen && (
        <div className='absolute z-10 w-full sm:w-36 mt-1 bg-gray-800 rounded-lg shadow-lg border border-gray-700'>
          <div className='py-1'>
            {mediaTypes.map(({ value, label }) => (
              <button
                key={value}
                className={`w-full px-4 py-2 text-left hover:bg-gray-700 ${
                  selectedType === value ? 'text-blue-500 font-medium' : 'text-gray-300'
                }`}
                onClick={() => {
                  onChange(value)
                  setIsOpen(false)
                }}>
                {label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
