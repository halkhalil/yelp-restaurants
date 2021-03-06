import React, { useContext } from "react";
import { Input } from "baseui/input";
import { SearchContext } from "../../../pages";

export const Location: React.FC<{}> = ({}) => {
  const {
    state: { location },
    actions: { updateLocation },
    dispatch,
  } = useContext(SearchContext);

  return (
    <Input
      value={"Arvada, CO"}
      onChange={(e) => dispatch(updateLocation(e.currentTarget.value))}
      placeholder="Location"
      disabled={true}
    />
  );
};
