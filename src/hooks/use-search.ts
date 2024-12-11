import _ from "lodash"
import { useMemo, useState } from "react"

const useSearch = (query?: string) => {
  const [searchKey, setSearchKey] = useState<string | undefined>(query)
  const [debouncedSearchKey, setDebouncedSearchKey] = useState<
    string | undefined
  >(query)

  const debouncedSearchKeyHandler = useMemo(() => {
    return _.debounce((key: string) => {
      setDebouncedSearchKey(key)
    }, 400)
  }, [])

  const handleSearch = (key: string) => {
    if (key) {
      setSearchKey(key)
      debouncedSearchKeyHandler(key)
    } else {
      setSearchKey("")
      debouncedSearchKeyHandler("")
    }
  }

  return {
    searchKey,
    debouncedSearchKey,
    handleSearch,
  }
}

export default useSearch
