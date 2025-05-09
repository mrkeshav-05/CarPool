
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const useGetConversation = () => {
  const [loading, setLoading] = useState(false);
	const [conversations, setConversations] = useState([]);

  useEffect(() => {
		const getConversations = async () => {
			setLoading(true);
			try {
				const res = await fetch(`${backendUrl}/api/users`)
				console.log(res.json)
				const data = await res.json();
				console.log(data)
				if (data.error) {
					throw new Error(data.error);
				}
				if(!Array.isArray(data)){
					localStorage.clear();
				}
				setConversations(data);
			} catch (error) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};

		getConversations();
	}, []);

	return { loading, conversations };
};

export default useGetConversation