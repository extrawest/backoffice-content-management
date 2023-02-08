import { FC } from "react";
import {Dimmer, Loader as LoaderComponent} from "semantic-ui-react";

export const Loader: FC = () => {
	return (
    <Dimmer
      active
      inverted
    >
      <LoaderComponent size='medium'>Loading</LoaderComponent>
    </Dimmer>
	);
};
