import { Fragment } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'

interface AutoCompleteProps {
    onChangeQuery: any
    onChangeValue: any
    options: any[]
    selected: any
    displayValue?: any
    resetSelected?: any
    placeholder?: string
    opacity?: number
    error?: boolean
    required?: boolean
    onInvalid?: any
    onInput?: any
}

const AutoComplete = ({
    onChangeQuery,
    onChangeValue,
    options,
    selected,
    displayValue = (option: any) => option ? option : '',
    resetSelected,
    placeholder,
    opacity = 1,
    error,
    required,
    onInvalid,
    onInput
}: AutoCompleteProps) => {
  
    return (
      <div className="w-full">
        <Combobox value={selected} onChange={onChangeValue}>
          <div className="relative mt-1">
            <div className={`relative border ${error ? 'border-red-700' : ''} w-full cursor-default overflow-hidden rounded-[4px] text-left shadow-md outline-none ring-0 sm:text-sm`}>
              <Combobox.Input
                required={required}
                onInvalid={onInvalid}
                onInput={onInput}
                placeholder={placeholder ? placeholder : ''}
                className={`w-full border-none py-2 pl-3 pr-10 text-sm text-black leading-5 ring-0 outline-none opacity-${opacity}`}
                displayValue={displayValue}
                onChange={onChangeQuery}
                autoComplete="off"
              />
              <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                <SelectorIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </Combobox.Button>
            </div>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              afterLeave={resetSelected}
            >
              <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-sm bg-white py-1 text-base shadow-lg ring-0 foutline-none sm:text-sm">
                {options.length === 0 ? (
                  <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                    Nothing found.
                  </div>
                ) : (
                  options.map((item) => (
                    <Combobox.Option
                      key={item._id ? item._id : item}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active ? 'bg-primary-600 text-white' : 'text-gray-900'
                        }`
                      }
                      value={item}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? 'font-medium' : 'font-normal'
                            }`}
                          >
                            {displayValue(item)}
                          </span>
                          {selected ? (
                            <span
                              className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                active ? 'text-white' : 'border-primary-600'
                              }`}
                            >
                              <CheckIcon className="h-5 w-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Combobox.Option>
                  ))
                )}
              </Combobox.Options>
            </Transition>
          </div>
        </Combobox>
      </div>
    )
}

export default AutoComplete