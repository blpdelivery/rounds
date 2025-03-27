<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:template match="/">
    <html>
      <body>
        <xsl:for-each select="feed/entry">
          <article id="{title}">
            <h2><xsl:value-of select="title" /></h2>
            <xsl:value-of select="content" />
            <figure>
              <xsl:for-each select="link[@rel='enclosure']">
                <xsl:choose>
                  <xsl:when test="starts-with(@type, 'image/')">
                    <img src="{@href}" />
                  </xsl:when>
                  <xsl:when test="starts-with(@type, 'video/')">
                    <video src="{@href}" controls="true" disablepictureinpicture="true" loop="true">Unable to embed video. <a href="{@href}" download="">Download</a> or <a href="{@href}">open</a> video.</video>
                  </xsl:when>
                  <xsl:fallback>
                    <p>File type not recognised. <a href="{@href}" download="">Download</a> or <a href="{@href}">open</a> file.</p>
                  </xsl:fallback>
                </xsl:choose>
              </xsl:for-each>
            </figure>
          </article>
        </xsl:for-each>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
