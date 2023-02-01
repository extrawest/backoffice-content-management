import { SxProps, Theme } from "@mui/material";
import { maxAuthWidth } from "../../../../shared/utils/src/lib/consts";

export const wrapperSx: SxProps<Theme> = {
  maxWidth: maxAuthWidth,
  mx: "auto",
  pt: 10
};
