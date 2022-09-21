export default async <TResponse>(
    url: string, 
    config?
  ): Promise<TResponse> => {
    const { useAuthToken } = useAuth()
    
    return await $fetch(url, {
        ...config,
        headers: {
            Authorization: `Bearer ${useAuthToken().value}`
        }
    });
    // return await response;
}