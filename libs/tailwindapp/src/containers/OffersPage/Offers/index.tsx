import {
	FC, useEffect, useState
} from "react";
import {
	addSx, boxSx, headerStackSx, subTextSx, taskRowSx, linkSx
} from "./Offers.sx";
import {
	Box, IconButton, Stack, Typography
} from "@mui/material";
import { Link } from "react-router-dom";
import {
	AppRoutesEnum, OfferType
} from "@lib/shared/types";
import { Modal } from "@lib/tailwind";
import {
	collection, getDocs, query, where
} from "firebase/firestore";
import { db } from "../../../../../shared/firebaseconfig";
import { useAuth } from "../../../../../shared/context/Auth";
import { AddOfferForm } from "../../../forms";

export const Offers:FC = () => {
	const [showModal, setShowModal] = useState(false);
	const [offers, setOffers] = useState<OfferType[]>([]);
	const me = useAuth();
	const handleShowModal = (status: boolean) => () => {
		setShowModal(status);
	};

	const getOffersData = async () => {
		try {
			if (me?.user?.uid) {
        const q = query(
          collection(db, "offers"),
          where("userId", "==", me.user.uid)
        );
				const offersRef = await getDocs(q);
				const data: OfferType[] = [];
				offersRef.forEach(it => {
					data.push(it.data() as OfferType);
					setOffers(data);
				});
			}
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(
		() => {
      getOffersData();
		},
		[]
	);

	return (
    <Box sx={boxSx}>
      <Stack sx={headerStackSx}>
        <Typography variant="h4">
          Offers
        </Typography>
        <Link
          to={AppRoutesEnum.TEAM}
          style={linkSx}
        >
          <Typography
            variant="caption"
            color="primary"
          >
            View all
          </Typography>
        </Link>
      </Stack>
      <Stack sx={headerStackSx}>
        <Typography sx={subTextSx}>
          Create new task
        </Typography>
        <IconButton
          onClick={handleShowModal(true)}
          sx={addSx}
        >
          +
        </IconButton>
      </Stack>
      {!!offers?.length && (
        <Stack>
          {offers.map((
            offer, i
          ) => (
            <Box
              key={i}
              sx={taskRowSx(i < offers?.length - 1)}
            >
              <Typography variant='h6'>
                {offer?.title}
              </Typography>
              <Typography variant='h6'>
                {offer?.description}
              </Typography>
            </Box>
          ))}
        </Stack>
      )}
      {!offers?.length &&
        <Typography
          variant="h4"
          p={2}
        >
          No offers yet...
        </Typography>
      }
      <Modal
        handleClose={handleShowModal(false)}
        open={showModal}
        title='Create new offer'
      >
        <AddOfferForm
          getOffers={getOffersData}
          closeModal={handleShowModal(false)}
        />
      </Modal>
    </Box>
	);
};
