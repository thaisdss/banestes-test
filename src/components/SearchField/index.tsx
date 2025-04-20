import { useState } from "react"
import { FilledInput, IconButton, InputAdornment, InputLabel } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search'
import { FormControlStyled } from "./styles";

type SearchFieldProps = {
    label: string
    handleSearch: (search: string) => void
}

export const SearchField = ({ label, handleSearch }: SearchFieldProps) => {
    const [isFocused, setIsFocused] = useState(false)
    const [search, setSearch] = useState('')

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value)
        handleSearch(event.target.value)
    }

    const handleIsFocused = (type: 'focus' | 'blur') => {
      if (type === 'blur' && search.length === 0) {
        return setIsFocused(false)
      }

      setIsFocused(true)
    }

    return (
        <FormControlStyled variant="filled">
          <InputLabel
          htmlFor="filled-adornment-search" 
          shrink={isFocused}
          >
            {label}
          </InputLabel>
          <FilledInput
            id="filled-adornment-search"
            type="text"
            value={search}
            onChange={handleChange}
            onFocus={() => handleIsFocused('focus')}
            onBlur={() => handleIsFocused('blur')}
            startAdornment={
              <InputAdornment position="start">
                <IconButton
                  aria-label="search"
                  edge="start"
                >
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControlStyled>
    )
}