import { useSelector } from "react-redux"
import { useState } from "react"
import Box from "@mui/material/Box"
import Alert from "@mui/material/Alert"
import IconButton from "@mui/material/IconButton"
import Collapse from "@mui/material/Collapse"
import Button from "@mui/material/Button"
import CloseIcon from "@mui/icons-material/Close"

export default function NotificationCentre() {
  const notifications = useSelector((state) => state.notifications)
  const [open, setOpen] = useState(true)

  return (
    <>
      <Box>
        {notifications.notifications.map((el) => (
          <Collapse key={el.id} in={open}>
            <Alert
              color={
                el.type === "addedNote" || el.type === "editedNote"
                  ? "success"
                  : "error"
              }
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpen(false)
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              {el.type === "addedNote" && "Note ajoutée !"}
              {el.type === "editedNote" && "Modifications prises en compte !"}
              {el.type === "deletedNote" &&
                "Note supprimée de la base de données."}
            </Alert>
          </Collapse>
        ))}
      </Box>
    </>
  )
}
