import * as React from "react";
import SelectUnstyled, {
  selectUnstyledClasses,
} from "@mui/base/SelectUnstyled";
import OptionUnstyled, {
  optionUnstyledClasses,
} from "@mui/base/OptionUnstyled";
import PopperUnstyled from "@mui/base/PopperUnstyled";
import { styled } from "@mui/system";

const blue = "#046A99";
const lightBlue = "#0679af";
const white = "#ffffff00";

const StyledButton = styled("button")(
  ({ theme }) => `
  font-family: Public Sans;
  font-weight: 400;
  font-size: 18px;
  line-height: 32px;
  box-sizing: border-box;
  display:flex;
  align-items: center;
  min-height: 45px;
  min-width: 126.2px;
  border: none;
  padding: 10px;
  text-align: left;
  color: ${blue};
  cursor: pointer;
  &.${selectUnstyledClasses.focusVisible} {
    outline: 3px solid ${blue};
  }

  &.${selectUnstyledClasses.expanded} {
    &::after {
      content:url("data:image/svg+xml,%3Csvg transform='scale(1,-1)' xmlns='http://www.w3.org/2000/svg' width='11' viewBox='0 0 20 12'%3E%3Cpath fill='%23046A99' d='m17.8.4-7.7 8.2L2.2.4C1.7-.1.9-.1.4.4s-.5 1.4 0 1.9l8.8 9.3c.3.3.7.4 1.1.4.3 0 .7-.1.9-.4l8.4-9.3c.5-.5.5-1.4 0-1.9s-1.3-.5-1.8 0z'/%3E%3C/svg%3E%0A");
      padding-left:10px;
      padding-bottom:5px;
    }
  }

  &::after {
    content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11' viewBox='0 0 20 12'%3E%3Cpath fill='%23046A99' d='m17.8.4-7.7 8.2L2.2.4C1.7-.1.9-.1.4.4s-.5 1.4 0 1.9l8.8 9.3c.3.3.7.4 1.1.4.3 0 .7-.1.9-.4l8.4-9.3c.5-.5.5-1.4 0-1.9s-1.3-.5-1.8 0z'/%3E%3C/svg%3E ");
    padding-left:10px;
    padding-bottom:5px;

  }
  `
);

const StyledListbox = styled("ul")(
  ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  min-width: 126.2px;
  background: ${"#ffff"};
  border: 2px solid ${blue};
  color: ${blue};
  overflow: auto;
  outline: 0px;
  margin:0px;
  `
);

const StyledOption = styled(OptionUnstyled)(
  ({ theme }) => `
  list-style: none;
  padding: 8px;
  cursor: default;
  min-width: 126.2px;
  height: 45px;
  margin:0px;
  cursor: pointer;
  text-align:center;

  &:last-of-type {
    border-bottom: none;
  }

  &.${optionUnstyledClasses.selected} {
    background-color: ${blue};
    color: ${"#ffffff"};
  }

  &.${optionUnstyledClasses.highlighted} {
    background-color: ${blue};
    color: ${"#ffffff"};
  }

  &.${optionUnstyledClasses.highlighted}.${optionUnstyledClasses.selected} {
    background-color: ${blue};
    color: ${"#ffffff"};
  }

  &.${optionUnstyledClasses.disabled} {
    color: ${blue};
  }

  &:hover:not(.${optionUnstyledClasses.disabled}) {
    background-color: ${lightBlue};
    color: ${"#ffffff"};
  }
  `
);

const StyledPopper = styled(PopperUnstyled)`
  z-index: 1;
`;

const CustomSelect = React.forwardRef(function CustomSelect(props, ref) {
  const components = {
    Root: StyledButton,
    Listbox: StyledListbox,
    Popper: StyledPopper,
    ...props.components,
  };

  return (
    <SelectUnstyled
      onChange={(e) => props.submit(e)}
      {...props}
      ref={ref}
      components={components}
    />
  );
});

export default function BasicSelect({ submit }) {
  return (
    <CustomSelect submit={submit} defaultValue={"score desc"}>
      <StyledOption value={"score desc"}>Best match</StyledOption>
      <StyledOption value={"metadata_modified desc"}>Most recent</StyledOption>
    </CustomSelect>
  );
}
