import {
  GridToolbarContainer,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
  GridToolbarColumnsButton,
  GridToolbarExport
} from "@mui/x-data-grid";
import { Box } from "@mui/material";  // Add this import for the Box component

export default function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector slotProps={{ tooltip: { title: "Change density" } }} />
      <Box sx={{ flexGrow: 1 }} />
      <GridToolbarExport
        slotProps={{
          tooltip: { title: "Export data" },
          button: { variant: "outlined" },
        }}
      />
    </GridToolbarContainer>
  );
}