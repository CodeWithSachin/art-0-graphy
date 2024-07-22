import axios from "axios";
import React from "react";

type Props = {
	videoUrl: string;
	title: string;
};

const CoursePlayer: React.FC<Props> = ({ videoUrl, title }) => {
	const [videoData, setVideoData] = React.useState({
		otp: "",
		playbackInfo: "",
	});

	React.useEffect(() => {
		axios
			.post(`${process.env.NEXT_PUBLIC_SERVER_URI}generateVideoUrl`, {
				videoId: videoUrl,
			})
			.then((res: any) => {
				setVideoData(res.data);
			});
	}, [videoUrl]);

	return (
		<div>
			<div style={{ paddingTop: "41%", position: "relative" }}>
				{videoData.otp && videoData.playbackInfo !== "" && (
					<iframe
						src={`https://player.vdocipher.com/v2/?otp=${videoData.otp}&playbackInfo=${videoData.playbackInfo}&player=eecBlyk0dOTeEuFK`}
						style={{
							border: 0,
							maxWidth: "100%",
							position: "absolute",
							top: 0,
							left: 0,
							height: "100%",
							width: "100%",
						}}
						allowFullScreen={true}
						allow="encrypted-media"
					></iframe>
				)}
			</div>
		</div>
	);
};

export default CoursePlayer;
