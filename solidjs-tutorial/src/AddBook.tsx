export default function AddBook() {
  return (
    <form
      onsubmit={(e) => {
        e.preventDefault();
      }}
    >
      <div>
        <label for="title">Book name</label>
        <input id="title" />
      </div>
      <div>
        <label for="author">Author</label>
        <input id="author" />
      </div>
      <button type="submit">Add book</button>
    </form>
  );
}
