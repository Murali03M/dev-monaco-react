// SearchBar.js


const SearchBar = ({ onSearch }) => {
  const handleSearch = (event) => {
    onSearch(event.target.value);
  };

  return (
    <input 
      type="text" 
      placeholder="Search challenges..." 
      onChange={handleSearch} 
      className="mb-4 p-2 border border-gray-300 rounded"
    />
  );
};

export default SearchBar;
