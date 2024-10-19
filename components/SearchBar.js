export default function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <div className="search-bar">
      <input type="text" placeholder="Search tasks..." value={searchTerm} onChange={(e) => onSearchChange(e.target.value)} />
    </div>
  );
}
