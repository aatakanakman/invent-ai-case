type MovieDetailLineProps = {
  label: string
  value?: string
}

export const MovieDetailLine: React.FC<MovieDetailLineProps> = ({ label, value }) => {
  if (!value || value === 'N/A') {
    return null
  }

  return (
    <div>
      <div className='text-sm text-gray-400 mb-1'>{label}</div>
      <div className='text-gray-200'>{value}</div>
    </div>
  )
}
