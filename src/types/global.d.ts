/**
 * RC (React Component)
 */
declare namespace RC {
  type WithChildren<Props = {}> = React.FC<React.PropsWithChildren<Props>>
  type WithoutChildren<Props = {}> = React.FC<Props>
}
