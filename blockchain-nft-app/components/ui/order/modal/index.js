import { useEthPrice } from "@components/hooks/useEthPrice";
import { Modal, CustomeButton } from "@components/ui/common";
import { useEffect, useState } from "react";

const defaultOrder = {
  price: "",
}

const _createFormState = (isDisabled = false, message = "") => ({isDisabled, message})

const createFormState = ({price, email, confirmationEmail}, hasAgreedTOS) => {
  if (!price || Number(price) <=0) {
    return _createFormState(true, "Price is not valid.")
  }
  else if (!hasAgreedTOS) {
    return _createFormState(true, "You need to agree with terms of service in order to submit the form")
  }

  return _createFormState()
}

export default function OrderModal({meme, onClose, onSubmit, onBuy = true}) {
  const [isOpen, setIsOpen] = useState(false)
  const [order, setOrder] = useState(defaultOrder)
  const [enablePrice, setEnablePrice] = useState(false)
  const [hasAgreedTOS, setHasAgreedTOS] = useState(false)
  const { eth } = useEthPrice()


  useEffect(() => {
    if (!!meme) {
      setIsOpen(true)
      setOrder({
        ...defaultOrder,
        price: meme.price
      })
    }
  }, [meme])

  const closeModal = () => {
    setIsOpen(false)
    setOrder(defaultOrder)
    setEnablePrice(false)
    setHasAgreedTOS(false)
    onClose()
  }

  const formState = createFormState(order, hasAgreedTOS)

  return (
    <Modal isOpen={isOpen}>
      <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div className="sm:flex sm:items-start">
            <div className="mt-3 sm:mt-0 sm:ml-4 sm:text-left">
              <h3 className="mb-7 text-lg font-bold leading-6 text-gray-900" id="modal-title">
                {meme.title}
              </h3>
              <div className="mt-1 relative rounded-md">
                <div className="mb-1">
                  <label className="mb-2 font-bold">Price(eth)</label>
                  {/* <div className="text-xs text-gray-700 flex">
                    <label className="flex items-center mr-2">
                      <input
                        checked={enablePrice}
                        onChange={({target: {checked}}) => {
                          setOrder({
                            ...order,
                            price: meme.price
                          })
                          setEnablePrice(checked)
                        }}
                        type="checkbox"
                        className="form-checkbox"
                      />
                    </label>
                    <span>Adjust Price - only when the price is not correct</span>
                  </div> */}
                </div>
                <input
                  disabled={onBuy}
                  value={order.price}
                  onChange={({target: {value}}) => {
                    if (isNaN(value)) { return; }
                    setOrder({
                      ...order,
                       price: value
                    })
                  }}
                  type="text"
                  name="price"
                  id="price"
                  className="disabled:opacity-50 w-80 mb-1 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-4 sm:text-sm border-gray-300 rounded-md"
                />

              </div>
              <div className="text-xs text-gray-700 flex">
                <label className="flex items-center mr-2">
                  <input
                  checked={hasAgreedTOS}
                    onChange={({target: {checked}}) => {
                      setHasAgreedTOS(checked)
                    }}
                    type="checkbox"
                    className="form-checkbox" />
                </label>
                <span>I accept 8Chiq &apos;terms of service&apos; and I agree that my order can be rejected in the case data provided above are not correct</span>
              </div>
              { formState.message && 
                <div className="p-4 my-3 text-red-700 bg-red-200 rounded-lg text-sm">
                    { formState.message}
                </div>}
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex">
          <CustomeButton
            disabled={formState.isDisabled} 
            onClick={() => {
              onSubmit(order, meme.id)
            }}>
            Submit
          </CustomeButton>
          <CustomeButton
            onClick={closeModal}
            variant="red">
            Cancel
          </CustomeButton>
        </div>
      </div>
    </Modal>
  )
}