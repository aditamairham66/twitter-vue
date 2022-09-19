export default function () {
    const config = useRuntimeConfig();
  
    return {
        BASE_URL: config.BASE_URL,
    }
}