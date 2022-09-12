export default async <TResponse>(
    url: string, 
    config: RequestInit = {}
  ): Promise<TResponse> => {
    const { useAuthToken } = useAuth()
    
    const response = await fetch(url, {
        ...config,
        headers: {
            Authorization: `Bearer ${useAuthToken().value}`
        }
    });
    return await response.json();
}