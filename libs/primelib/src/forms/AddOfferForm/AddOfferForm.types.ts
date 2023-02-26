export type AddOfferValues = {
	title: string;
	description: string;
};

export type AddOfferFormProps = {
	getOffers: () => void;
	closeModal: () => void;
};
