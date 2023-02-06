import { FC } from "react";
import {Loader as LoaderComponent} from "semantic-ui-react";

export const Loader: FC = () => {
	return (
    <LoaderComponent
      active
      inline='centered'
    />
	);
};
