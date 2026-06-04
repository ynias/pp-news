export function useFavourites() {
  const favourites = useCookie<number[]>('pp-favourites', {
    default: () => [],
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
  })

  function toggle(id: number) {
    if (favourites.value.includes(id)) {
      favourites.value = favourites.value.filter((f) => f !== id)
    } else {
      favourites.value = [...favourites.value, id]
    }
  }

  function isFavourite(id: number): boolean {
    return favourites.value.includes(id)
  }

  return { favourites, toggle, isFavourite }
}
