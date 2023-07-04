import React, { useEffect } from 'react'

import styles from './Disclaimer.module.css'

function Disclaimer({ onMount }) {
  useEffect(() => {
    onMount()
  }, [onMount])

  return (
    <div className={styles.main}>
      <p>
        WEBSITE DISCLAIMER The information provided by CloudKii
        ("CloudKii",“we,” “us” or “our”) on{' '}
        <a href="https://cloudki.io" rel="noreferrer nofollow" target="_blank">
          https://cloudki.io
        </a>{' '}
        or{' '}
        <a
          href="https://www.theprofileprofiteer.com"
          rel="noreferrer nofollow"
          target="_blank"
        >
          https://www.theprofileprofiteer.com
        </a>{' '}
        (the “Site”) is for general informational purposes only. All information
        on the Site is provided in good faith, however we make no representation
        or warranty of any kind, express or implied, regarding the accuracy,
        adequacy, validity, reliability, availability or completeness of any
        information on the Site.
      </p>
      <p>
        UNDER NO CIRCUMSTANCE SHALL WE HAVE ANY LIABILITY TO YOU FOR ANY LOSS OR
        DAMAGE OF ANY KIND INCURRED AS A RESULT OF THE USE OF THE SITE OR
        RELIANCE ON ANY INFORMATION PROVIDED ON THE SITE. YOUR USE OF THE SITE
        AND YOUR RELIANCE ON ANY INFORMATION ON THE SITE IS SOLELY AT YOUR OWN
        RISK.
      </p>
      <p>
        Liability Disclaimer THE INFORMATION, SOFTWARE, PRODUCTS, AND SERVICES
        INCLUDED IN OR AVAILABLE THROUGH THE SITE MAY INCLUDE INACCURACIES OR
        TYPOGRAPHICAL ERRORS. CHANGES ARE PERIODICALLY ADDED TO THE INFORMATION
        HEREIN. QWERTYFACE MEDIA, LLC AND/OR ITS SUPPLIERS MAY MAKE IMPROVEMENTS
        AND/OR CHANGES IN THE SITE AT ANY TIME.QWERTYFACE MEDIA, LLC AND/OR ITS
        SUPPLIERS MAKE NO REPRESENTATIONS ABOUT THE SUITABILITY, RELIABILITY,
        AVAILABILITY, TIMELINESS, AND ACCURACY OF THE INFORMATION, SOFTWARE,
        PRODUCTS, SERVICES AND RELATED GRAPHICS CONTAINED ON THE SITE FOR ANY
        PURPOSE. TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, ALL SUCH
        INFORMATION, SOFTWARE, PRODUCTS, SERVICES AND RELATED GRAPHICS ARE
        PROVIDED "AS IS" WITHOUT WARRANTY OR CONDITION OF ANY KIND.
      </p>
      <p>
        QWERTYFACE MEDIA, LLC AND/OR ITS SUPPLIERS HEREBY DISCLAIM ALL
        WARRANTIES AND CONDITIONS WITH REGARD TO THIS INFORMATION, SOFTWARE,
        PRODUCTS, SERVICES AND RELATED GRAPHICS, INCLUDING ALL IMPLIED
        WARRANTIES OR CONDITIONS OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
        PURPOSE, TITLE AND NON-INFRINGEMENT.
      </p>
      <p>
        TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL
        QWERTYFACE MEDIA, LLC AND/OR ITS SUPPLIERS BE LIABLE FOR ANY DIRECT,
        INDIRECT, PUNITIVE, INCIDENTAL, SPECIAL, CONSEQUENTIAL DAMAGES OR ANY
        DAMAGES WHATSOEVER INCLUDING, WITHOUT LIMITATION, DAMAGES FOR LOSS OF
        USE, DATA OR PROFITS, ARISING OUT OF OR IN ANY WAY CONNECTED WITH THE
        USE OR PERFORMANCE OF THE SITE, WITH THE DELAY OR INABILITY TO USE THE
        SITE OR RELATED SERVICES, THE PROVISION OF OR FAILURE TO PROVIDE
        SERVICES, OR FOR ANY INFORMATION, SOFTWARE, PRODUCTS, SERVICES AND
        RELATED GRAPHICS OBTAINED THROUGH THE SITE, OR OTHERWISE ARISING OUT OF
        THE USE OF THE SITE, WHETHER BASED ON CONTRACT, TORT, NEGLIGENCE, STRICT
        LIABILITY OR OTHERWISE, EVEN IF QWERTYFACE MEDIA, LLC OR ANY OF ITS
        SUPPLIERS HAS BEEN ADVISED OF THE POSSIBILITY OF DAMAGES.
      </p>
      <p>
        BECAUSE SOME STATES/JURISDICTIONS DO NOT ALLOW THE EXCLUSION OR
        LIMITATION OF LIABILITY FOR CONSEQUENTIAL OR INCIDENTAL DAMAGES, THE
        ABOVE LIMITATION MAY NOT APPLY TO YOU.
      </p>
      <p>
        IF YOU ARE DISSATISFIED WITH ANY PORTION OF THE SITE, OR WITH ANY OF
        THESE TERMS OF USE, YOUR SOLE AND EXCLUSIVE REMEDY IS TO DISCONTINUE
        USING THE SITE.
      </p>
      <p>
        Any representations of earnings are only what is possible and do not
        imply any guarantees of any kind, you are responsible for earning income
        with our program, and you might not earn anything at all. You may lose
        your investment due to any number of reasons outside of the control of
        anyone, and you are agreeing to the risk of loss by participating in
        anything we are offering you.
      </p>
      <p>
        Third Party Accounts You will be able to connect your DBA,
        ELMConnect.app account to third party accounts. By connecting your DBA,
        EvergreenLeadMachine.com account to your third party account, you
        acknowledge and agree that you are consenting to the continuous release
        of information about you to others (in accordance with your privacy
        settings on those third party sites). If you do not want information
        about you to be shared in this manner, do not use this feature.
      </p>
      <p>
        Contact Us DBA, CloudKi.io welcomes your questions or comments regarding
        the terms: QwertyFace Media, LLC 721 Allen Drive Grand Rapids, Minnesota
        55744 Support Email Address: support@qwertyface.media
      </p>
      <p>Effective as of October 1st, 2020</p>
    </div>
  )
}

export default Disclaimer
