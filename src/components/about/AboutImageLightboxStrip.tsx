"use client";

import { Flex, IconButton, Media, Row } from "@once-ui-system/core";
import Image from "next/image";
import { createPortal } from "react-dom";
import { useCallback, useEffect, useState, type MouseEvent } from "react";

export type AboutStripImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

type AboutImageLightboxStripProps = {
  images: AboutStripImage[];
  /** Matches about page layout: work images use extra left padding */
  variant?: "experience" | "certificates";
};

export function AboutImageLightboxStrip({
  images,
  variant = "experience",
}: AboutImageLightboxStripProps) {
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const close = useCallback(() => setActive(null), []);

  const goPrev = useCallback(() => {
    setActive((i) => {
      if (i === null || images.length < 2) return i;
      return i <= 0 ? images.length - 1 : i - 1;
    });
  }, [images.length]);

  const goNext = useCallback(() => {
    setActive((i) => {
      if (i === null || images.length < 2) return i;
      return i >= images.length - 1 ? 0 : i + 1;
    });
  }, [images.length]);

  useEffect(() => {
    if (active === null) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (images.length < 2) return;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
        return;
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      }
    };

    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [active, images.length, close, goPrev, goNext]);

  if (!images.length) return null;

  const current = active !== null ? images[active] : null;
  const showNav = images.length > 1;

  const lightbox =
    mounted && active !== null && current ? (
      <Flex
        role="dialog"
        aria-modal="true"
        aria-label={current.alt || "Image preview"}
        position="fixed"
        top="0"
        left="0"
        fillWidth
        center
        vertical="center"
        horizontal="center"
        pointerEvents="auto"
        background="overlay"
        onClick={close}
        style={{
          zIndex: 100,
          width: "100vw",
          height: "100vh",
          backdropFilter: "blur(0.5rem)",
        }}
      >
        <IconButton
          type="button"
          variant="secondary"
          icon="close"
          size="m"
          onClick={(e: MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();
            close();
          }}
          aria-label="Close preview"
          style={{
            position: "fixed",
            top: "clamp(12px, 3vh, 24px)",
            right: "clamp(12px, 3vw, 24px)",
            zIndex: 102,
          }}
        />
        <Row
          position="relative"
          fillWidth
          horizontal="center"
          vertical="center"
          paddingX="48"
          style={{ maxWidth: "100%", boxSizing: "border-box" }}
          onClick={(e: MouseEvent<HTMLDivElement>) => e.stopPropagation()}
        >
          {showNav && (
            <IconButton
              type="button"
              variant="secondary"
              icon="chevronLeft"
              size="m"
              onClick={(e: MouseEvent<HTMLButtonElement>) => {
                e.stopPropagation();
                goPrev();
              }}
              aria-label="Previous image"
              style={{
                position: "absolute",
                left: "clamp(4px, 1.5vw, 16px)",
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 2,
              }}
            />
          )}
          <Image
            src={current.src}
            alt={current.alt}
            width={1600}
            height={1200}
            sizes="90vw"
            priority
            style={{
              width: "90vw",
              height: "90vh",
              maxWidth: showNav ? "min(86vw, calc(100vw - 96px))" : "90vw",
              maxHeight: "90vh",
              objectFit: "contain",
              borderRadius: "var(--radius-m, 8px)",
            }}
          />
          {showNav && (
            <IconButton
              type="button"
              variant="secondary"
              icon="chevronRight"
              size="m"
              onClick={(e: MouseEvent<HTMLButtonElement>) => {
                e.stopPropagation();
                goNext();
              }}
              aria-label="Next image"
              style={{
                position: "absolute",
                right: "clamp(4px, 1.5vw, 16px)",
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 2,
              }}
            />
          )}
        </Row>
      </Flex>
    ) : null;

  return (
    <>
      <Row
        fillWidth
        paddingTop="m"
        gap="12"
        wrap
        {...(variant === "experience" ? { paddingLeft: "40" } : {})}
      >
        {images.map((image, index) => (
          <button
            key={`${image.src}-${index}`}
            type="button"
            onClick={() => setActive(index)}
            aria-label={`Open image ${index + 1} of ${images.length}: ${image.alt}`}
            style={{
              border: "none",
              padding: 0,
              margin: 0,
              background: "transparent",
              cursor: "zoom-in",
              font: "inherit",
            }}
          >
            <Row
              border="neutral-medium"
              radius="m"
              minWidth={image.width}
              height={image.height}
            >
              <Media
                enlarge={false}
                radius="m"
                sizes={image.width.toString()}
                alt={image.alt}
                src={image.src}
              />
            </Row>
          </button>
        ))}
      </Row>
      {mounted && typeof document !== "undefined" && lightbox
        ? createPortal(lightbox, document.body)
        : null}
    </>
  );
}
