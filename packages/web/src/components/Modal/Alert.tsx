interface Props {
  text: string
  closeModal: () => void
}

const Alert = ({ text, closeModal }: Props) => {
  return (
    <div className="bg-white p-4 rounded flex flex-col items-center">
      <p className="mb-4 text-center">{text}</p>
      <button
        onClick={closeModal}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Confirm
      </button>
    </div>
  )
}

export default Alert
