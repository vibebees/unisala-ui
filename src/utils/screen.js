export const handleResize = ({width, setWidth}) => {
    const { innerWidth = 0 } = window || {}

    if (width !== innerWidth && innerWidth) {
        setWidth(innerWidth)
    }
}
