import type React from "react";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  onSearch: (_query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  return (
    <Input
      type="search"
      placeholder="Search questions..."
      onChange={e => onSearch(e.target.value)}
      className="w-full"
    />
  );
};

export default SearchBar;
