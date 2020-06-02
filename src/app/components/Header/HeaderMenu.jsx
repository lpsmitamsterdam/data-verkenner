import React from 'react'
import { MenuFlyOut, MenuItem, MenuButton } from '@datapunt/asc-ui'
import { ChevronRight } from '@datapunt/asc-assets'
import PropTypes from 'prop-types'
import { useMatomo } from '@datapunt/matomo-tracker-react'
import RouterLink from 'redux-first-router-link'
import { toArticleDetail } from '../../../store/redux-first-router/actions'
import truncateString from '../../../shared/services/truncateString/truncateString'
import navigationLinks from '../HomePage/services/navigationLinks'

import { HEADER_LINKS } from '../../../shared/config/config'

const HeaderMenu = ({ Component, login, logout, user, showFeedbackForm, ...props }) => {
  const [menuOpen, setMenuOpen] = React.useState(false)
  const { trackEvent } = useMatomo()
  return (
    <Component {...props} open={menuOpen} hasBackDrop onExpand={setMenuOpen}>
      <MenuFlyOut label="Onderdelen">
        {navigationLinks.map(({ id, title, to }) => (
          <MenuButton
            onClick={() => {
              trackEvent({
                category: 'navigation',
                action: 'main-menu',
                name: title,
              })
            }}
            as={RouterLink}
            iconLeft={<ChevronRight />}
            key={id}
            title={title}
            to={to}
          >
            {title}
          </MenuButton>
        ))}
      </MenuFlyOut>
      <MenuFlyOut label="Over OIS">
        {HEADER_LINKS &&
          HEADER_LINKS.ABOUT.map(({ title, id, slug }) => {
            const linkId = id[process.env.NODE_ENV]

            return (
              <MenuItem key={linkId}>
                <MenuButton
                  onClick={() => {
                    trackEvent({
                      category: 'navigation',
                      action: 'main-menu',
                      name: title,
                    })
                  }}
                  as={RouterLink}
                  iconLeft={<ChevronRight />}
                  title={title}
                  to={toArticleDetail(linkId, slug)}
                >
                  {title}
                </MenuButton>
              </MenuItem>
            )
          })}
      </MenuFlyOut>
      <MenuItem>
        <MenuButton
          type="button"
          onClick={async () => {
            trackEvent({
              category: 'navigation',
              action: 'main-menu',
              name: 'Feedback',
            })
            await setMenuOpen(false)
            showFeedbackForm()
          }}
        >
          Feedback
        </MenuButton>
      </MenuItem>
      {HEADER_LINKS && (
        <MenuItem>
          <MenuButton
            as={RouterLink}
            onClick={() => {
              trackEvent({
                category: 'navigation',
                action: 'main-menu',
                name: HEADER_LINKS.HELP.title,
              })
            }}
            title={HEADER_LINKS.HELP.title}
            to={toArticleDetail(HEADER_LINKS.HELP.id[process.env.NODE_ENV], HEADER_LINKS.HELP.slug)}
          >
            {HEADER_LINKS.HELP.title}
          </MenuButton>
        </MenuItem>
      )}
      {!user.authenticated ? (
        <MenuItem>
          <MenuButton
            type="button"
            onClick={(e) => {
              login(e)
              trackEvent({
                category: 'navigation',
                action: 'main-menu',
                name: 'Login',
              })
            }}
          >
            Inloggen
          </MenuButton>
        </MenuItem>
      ) : (
        <MenuFlyOut data-test="login" label={truncateString(user.name, 9)}>
          <MenuItem>
            <MenuButton
              type="button"
              onClick={(e) => {
                logout(e)
                trackEvent({
                  category: 'navigation',
                  action: 'main-menu',
                  name: 'Logout',
                })
              }}
              iconLeft={<ChevronRight />}
            >
              Uitloggen
            </MenuButton>
          </MenuItem>
        </MenuFlyOut>
      )}
    </Component>
  )
}

HeaderMenu.propTypes = {
  Component: PropTypes.element.isRequired,
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  showFeedbackForm: PropTypes.func.isRequired,
  user: PropTypes.shape({}).isRequired,
}

export default HeaderMenu
