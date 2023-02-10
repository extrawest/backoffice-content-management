import {
	FC, useEffect, useState
} from "react";
import { Link } from "react-router-dom";
import {AppRoutesEnum, OfferType} from "@lib/shared/types";
import { Modal } from "@semanticlib";
import {
	collection, getDocs, query, where
} from "firebase/firestore";
import { db } from "@libs/shared/firebaseconfig";
import { AddOfferForm } from "@semanticlib";
import { useAuth } from "@lib/shared";

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
					collection(
						db,
						"offers"
					),
					where(
						"userId",
						"==",
						me.user.uid
					)
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
    <div className="border rounded-1">
      <div className="flex justify-between align-middle p-2">
        <h4 className="header-section">
          Offers
        </h4>
        <Link
to={AppRoutesEnum.TEAM}
className="flex items-center no-underline"
        >
              <span className="flex items-center">
                View all
              </span>
        </Link>
      </div>
      <div className="flex justify-between align-middle p-2">
        <h5 className="sub-header">
          Create new offer
        </h5>
        <button
          onClick={handleShowModal(true)}
          className="icon-btn"
        >
          +
        </button>
      </div>
      {!!offers?.length && (
        <ul>
          {offers.map((
            offer, i
          ) => (
            <li
              key={i}
              className="flex justify-between items-center w-full p-2 border-b border-colorBorder border-solid last:border-0"
            >
              <h6 className="task-title">
                {offer?.title}
              </h6>
              <h6 className="task-title">
                {offer?.description}
              </h6>
            </li>
          ))}
        </ul>
      )}
      {!offers?.length &&
        <h4 className="sub-header p-2">
          No offers yet...
        </h4>
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
    </div>
	);
};
