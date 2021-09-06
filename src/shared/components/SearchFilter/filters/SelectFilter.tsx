import { Label, Select } from '@amsterdam/asc-ui'
import styled from 'styled-components'
import type { FunctionComponent } from 'react'
import type { FilterProps } from '../models'
import { formatAllOptionLabel, formatOptionLabel } from '../utils'

const StyledLabel = styled(Label)`
  height: 0px;
  padding: 0px;
  margin: 0px;
  color: transparent;
`

const SelectFilter: FunctionComponent<FilterProps> = ({
  type,
  label,
  options,
  totalCount,
  hideCount,
  selection,
  onSelectionChange,
}) => {
  function onChange(event: React.FormEvent<HTMLSelectElement>) {
    const { value: changedValue } = event.currentTarget

    if (changedValue === '') {
      onSelectionChange([])
    } else {
      onSelectionChange([changedValue])
    }
  }

  const currentValue = selection.length > 0 ? selection[0] : ''

  return (
    <>
      <StyledLabel htmlFor={type} label={label} />
      <Select id={type} data-testid={type} onChange={onChange} value={currentValue}>
        <option key={`${type}-all`} value="">
          {formatAllOptionLabel(totalCount, hideCount)}
        </option>
        {options.map((option) => {
          const controlId = `${type}-${option.id}`

          return (
            <option key={controlId} value={option.id}>
              {formatOptionLabel(option, hideCount)}
            </option>
          )
        })}
      </Select>
    </>
  )
}

export default SelectFilter
