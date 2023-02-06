import { FC, PropsWithChildren } from "react";
import { Menu } from "../../Menu";
import { Grid } from "semantic-ui-react";

export const PageLayout:FC<PropsWithChildren<Record<string, unknown>>> = ({children}) => {
	return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={3}>
          <Menu/>
        </Grid.Column>
        <Grid.Column
          width={13}

          className="p-2"
        >
          {children}
        </Grid.Column>
      </Grid.Row>
    </Grid>
    // <div className="flex w-full">
    //   <div className="w-menu">
    //     <Menu/>
    //   </div>
    //   <div className="w-full py-10 pl-5 pr-10">
    //     {children}
    //   </div>
    // </div>
	);
};
