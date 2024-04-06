const Version = () => {
	return (
		<div style={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}>
			Version: {process.env.PACKAGE_VERSION}
		</div>
	);
};

export default Version;
