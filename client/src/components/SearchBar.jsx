import TextField from "@mui/material/TextField";

export default function SearchBar({handleInput, onClick}) {
  return (
    <>
        <TextField
          onClick={onClick}
          id="outlined-basic"
          onChange={handleInput}
          variant="outlined"
          fullWidth
          label="Recherche"
        />
    </>
  )
}