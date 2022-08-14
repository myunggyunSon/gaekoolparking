export interface Review {
  author: string;
  comment: string;
  parkingId: number;
  createdAt?: string;
}

export const addNewReview = async (review: Review) => {
  try {
    const response = await fetch(
      "https://api.airtable.com/v0/app6PE5rMIkIIqPNZ/review",
      {
        headers: {
          Authorization: "Bearer keybAes5GAMvz2kuG",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          records: [
            {
              fields: {
                // parkingLotId는 변수로 받아오기, content & author는 textInput
                author: review.author,
                comment: review.comment,
                parkingId: review.parkingId,
              },
            },
          ],
        }),
      }
    );
    const responseJson = await response.json();
    console.log(responseJson);
    return responseJson;
  } catch (err) {
    alert("서버와의 연결이 좋지 않습니다. 나중에 시도해주세요!");
    return null;
  }
};
